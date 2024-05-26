import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'] // Correct property name
})
export class EmployeeDetailsComponent implements OnInit {

  id!: number; // Definite assignment assertion
  employee: Employee = new Employee(); // Initialize with a new Employee instance

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    });
  }

  protected readonly Employee = Employee;
}
