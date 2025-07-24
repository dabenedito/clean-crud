import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from "../../../shared/models/user";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { JsonPipe } from "@angular/common";
import { UserService } from "../../../shared/services/user.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  providers: [UserService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  @Input() user?: User;
  @Input() modalOpen = false;

  @Output() modalOpenChange = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<User>();

  form: FormGroup;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly activeModal: NgbActiveModal,
    private readonly userService: UserService,
  ) {
    this.form = this.fb.group({
      id: null,
      name: ['', [Validators.required, Validators.min(3), Validators.max(100)]],
      birthDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.form.patchValue({
        id: this.user.id,
        name: this.user.name,
        birthDate: this.user.birthDate.split('T')[0],
      });
    }
  }

  closeModal(): void {
    this.user = undefined;
    this.activeModal.dismiss();
  }

  parseUser(): Partial<User> {
    return {
      id: this.form.value.id ?? undefined,
      name: this.form.value.name,
      birthDate: new Date(this.form.value.birthDate).toISOString(),
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      const request = this.parseUser();

      if (request.id) {
        this.userService.update(request).pipe(takeUntil(this.onDestroy$)).subscribe({
          next: value => {
            if (value.success) {
              this.user = undefined;
              this.activeModal.close(value.data);
            }
          },
          error: error => {
            console.error(error);
          }
        });
      } else {
        this.userService.create(request).pipe(takeUntil(this.onDestroy$)).subscribe({
          next: value => {
            if (value.success) {
              this.user = undefined;
              this.activeModal.close(value.data);
            }
          },
          error: error => {
            console.error(error);
          }
        });
      }
    }
  }
}
