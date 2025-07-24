import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../../shared/models/user";
import { DatePipe } from "@angular/common";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../../../shared/services/user.service";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    DatePipe
  ],
  providers: [UserService],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  @Input() userId: number;

  user: User ;

  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getById(this.userId).subscribe({
      next: response => {
        if (response.data) {
          this.user = response.data;
        }
      },
      error: error => console.error(error)
    })
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
