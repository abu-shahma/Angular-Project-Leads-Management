import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {
  displayedColumns: string[] = [
    'leadID',
    'prospectName',
    'phone',
    'email',
    'college',
    'course',
    'applicationForm',
    'lastOutgoingCallStatus',
    'lastOutgoingCallAt',
    'lastActivity',
    'leadPriority',
    'instanceType',
    'leadInstanceSource',
    'leadType',
    'leadOwnerAssignmentAge',
    'leadOwner',
    'action'
  ];
  leads: any[] = [];
  selectedCategory = 'all';  // Default category
  page = 1;
  pageSize = 1;
  totalLeads = 0;
  totalPages = 0;
  errorMessage = '';

  constructor(private leadService: LeadService) {}

  ngOnInit() {
    this.loadLeads();  // Load leads on component init
  }

  loadLeads(event?: any) {
    if (event) {
      this.page = event.pageIndex + 1;  // Adjust for 0-based index
      this.pageSize = event.pageSize;
    }

    this.leadService.getLeads(this.selectedCategory, this.page, this.pageSize).subscribe({
      next: (response) => {
        this.leads = response.data;
        this.totalLeads = response.total;
        this.totalPages = Math.ceil(this.totalLeads / this.pageSize);
      },
      error: (error) => {
        this.errorMessage = 'Error loading leads. Please try again later.';
        console.error('Error:', error);
      }
    });
  }

  // Select a different category and load leads
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.page = 1;  // Reset to the first page
    this.loadLeads();
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadLeads();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadLeads();
    }
  }
}