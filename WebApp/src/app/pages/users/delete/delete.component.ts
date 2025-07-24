import { Component, Input, OnDestroy } from '@angular/core';
import { DatePipe } from "@angular/common";
import { User } from "../../../shared/models/user";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../../../shared/services/user.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    DatePipe
  ],
  providers: [UserService],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnDestroy {
  @Input() user: User;

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly userService: UserService,
  ) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  deleteUser(): void {
    this.userService.delete(this.user.id).pipe(takeUntil(this.onDestroy$)).subscribe({
      next: response => {
        if (response.success) {
          this.activeModal.close(response.success);
        }
      },
      error: error => console.error(error)
    })
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
