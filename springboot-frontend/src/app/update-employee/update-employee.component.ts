import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import {ActivatedRoute, Router} from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {CreateEmployeeComponent} from '../create-employee/create-employee.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'] // Correct property name
})
export class UpdateEmployeeComponent implements OnInit {

  id!: number; // Definite assignment assertion
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).pipe(
      tap((data: Employee) => {
        this.employee = data;
      }),
      catchError((error: any) => {
        console.log(error);
        return of(new Employee()); // Return a new Employee instance in case of error
      })
    ).subscribe();
  }

onSubmit(){
    this.employeeService.updateEmployee(this.id, this.employee).subscribe( data =>{
      console.log(data);
      this.employee = new Employee();
      this.goToEmployeeList();
    },
    error => console.log(error));
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']).then(success => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.log('Navigation failed');
      }
    }).catch(err => {
      console.error('Navigation error: ', err);
    });
  }
}



