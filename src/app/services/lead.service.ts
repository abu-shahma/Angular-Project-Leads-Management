import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LeadComponent } from '../lead/lead.component'

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  currentPage = 1;
  private apiUrl = 'https://dev-cc.automateazy.com/api/v1/getLeads';
  private token = localStorage.getItem('authToken');
  private requestBody = {
    "id": "",
    "name": "",
    "priority": "",
    "lead_type": "all",
    "isUntouched": 0,
    "source": "",
    "sdate": "",
    "edate": "",
    "uStartDate": "",
    "uEndDate": "",
    "activitySDate": "",
    "activityEndDate": "",
    "user_role": 1,
    "vc": 0,
    "page_no": LeadComponent.prototype.currentPage,
    "limit": 200,
    "type": "",
    "leadStageCreator": "",
    "firstStageLeadAction": "",
    "secondStageLeadAction": "",
    "thirdStageLeadAction": "",
    "fourthStageLeadAction": "",
    "fifthStageLeadAction": "",
    "lastFirstStageLeadAction": "",
    "lastSecondStageLeadAction": "",
    "lastThirdStageLeadAction": "",
    "lastFouthStageLeadAction": "",
    "lastFifthStageLeadAction": "",
    "sub_stage": "",
    "allleadaction": "",
    "clgId": "",
    "sortKey": "lead_times_at",
    "sortOrder": "-1",
    "format": "search",
    "accessAllLeads": 1,
    "state": "",
    "city": "",
    "course": "",
    "stateName": "",
    "cityName": "",
    "courseName": "",
    "category": "",
    "noOfReEnquiry": "",
    "reEnquiryOperation": "",
    "noOfApplicationForm": "",
    "applicationFormOperation": "",
    "lead_score": "",
    "leadScoreOpreation": "",
    "lead_stage_count": "",
    "leadStageCountOpreation": "",
    "recentReEnquiredAtOperation": "",
    "lastReEnquiredAtOperation": "",
    "recentLeadStageAtOperation": "",
    "leadActivityAtOperation": "",
    "createdAtOperation": "",
    "updatedAtOperation": "",
    "leadAssignAtOperation": "",
    "reEnquiredClg": "",
    "lastReEnquiredClg": "",
    "reEnquiredClgSource": "",
    "reEnquiredsdate": "",
    "reEnquirededate": "",
    "reLastEnquiredsdate": "",
    "reLastEnquirededate": "",
    "utmSource": "",
    "utmCampaign": "",
    "utmMedium": "",
    "reEnquiredUtmSource": "",
    "reEnquiredUtmMedium": "",
    "reEnquiredUtmCampaign": "",
    "fw_sdate": "",
    "fw_edate": "",
    "n_id": "",
    "recentLeadStageStartDate": "",
    "recentLeadStageEndDate": "",
    "leadAssigneeStartDate": "",
    "leadAssigneeEndDate": "",
    "oldUserId": "",
    "reAssignedUserId": "",
    "activity_event": "",
    "publisher_tenant_id": "",
    "org_location_name": "",
    "sinceLeadOwnerChange": "",
    "createdAtAgeTimeGap": "",
    "ownerAssignmentAtAgeTimeGap": "",
    "stageCreatedAtAgeTimeGap": " ",
    "primary_source": "",
    "secondary_source": "",
    "tertiary_source": "",
    "last_source": ""
  };

  constructor(private http: HttpClient) { }

  getAllLeads(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, this.requestBody, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching leads:', error);
        return throwError(error);
      })
    );
  }
}
