import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from "../../shared/models/user";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { UserService } from "../../shared/services/user.service";
import { Subject, takeUntil } from "rxjs";
import { FormComponent } from "./form/form.component";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DetailComponent } from "./detail/detail.component";
import { DeleteComponent } from "./delete/delete.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf,
  ],
  providers: [UserService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly userService: UserService,
    private readonly modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.userService.getAll().pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (response) => {
        this.users = response.data ?? [];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  openFormModal(user?: User): void {
    const formRef = this.modalService.open(FormComponent);
    formRef.componentInstance.user = user;

    formRef.result.then((result): void => {
      const userAux = this.users.find(u => u.id === result.id);
      if (userAux) {
        const index = this.users.indexOf(userAux);
        this.users[index] = result;
      } else {
        this.users.push(result);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  openDetailModal(user: User): void {
    const detailRef = this.modalService.open(DetailComponent);
    detailRef.componentInstance.userId = user.id;
  }

  openDeleteModal(user: User): void {
    const deleteRef = this.modalService.open(DeleteComponent);
    deleteRef.componentInstance.user = user;

    deleteRef.result.then((result: boolean): void => {
      if (!result) {
        return;
      }

      const index = this.users.indexOf(user);
      this.users.splice(index, 1);
    }, (reason) => {
      console.log(reason);
    });
  }
}
