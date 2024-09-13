import { Component, OnInit, ViewChild } from '@angular/core';
import { LeadService } from '../services/lead.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Lead } from './lead.model'; // Ensure this model matches your API response structure



@Component({
  selector: 'app-leads',
  templateUrl: './lead.component.html',
  styleUrl: './lead.component.css'
})
export class LeadComponent implements OnInit {
  dataSource = new MatTableDataSource<Lead>([]);
  leads: any[] = [];
  error: string = '';

  displayedColumns: string[] = [
    'id', 'name', 'phone', 'email', 'college', 'course',
    'applicationForm', 'lastOutgoingCallStatus', 'lastOutgoingCallAt',
    'lastActivity', 'leadPriority', 'instanceType', 'leadInstanceSource',
    'leadType', 'leadOwnerAssignmentAge', 'leadOwner'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  currentPage = 1;
  totalRecords = 0;


  constructor(private leadService: LeadService) { }

  ngOnInit(): void {
    this.loadLeads();
  }

  loadLeads(): void {
    this.leadService.getAllLeads().subscribe({
      next: (response) => {
        console.log("Fetched data", response);
        this.totalRecords = response.count;
            const newLeads = response.data || [];
            this.dataSource.data = newLeads; // Set the data directly to the dataSource
            this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.error = 'Failed to load leads.';
        console.error('Leads fetch error:', err);
      }
    });
  }
  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadLeads();
  }
}
