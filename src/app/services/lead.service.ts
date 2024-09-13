import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private leadsUrl = 'https://dev-cc.automateazy.com/api/v1/getLeads';

  constructor(private authService: AuthService) {}

  getLeads(category: string, page: number, pageSize: number): Observable<any> {
    const token = this.authService.getToken();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const body = {
      id: "",
      name: "",
      priority: "",
      lead_type: category,
      isUntouched: 0,
      source: "",
      sdate: "",
      edate: "",
      uStartDate: "",
      uEndDate: "",
      activitySDate: "",
      activityEndDate: "",
      user_role: 1,
      vc: 0,
      page_no: page,
      limit: pageSize,
      type: "",
      leadStageCreator: "",
      firstStageLeadAction: "",
      secondStageLeadAction: "",
      thirdStageLeadAction: "",
      fourthStageLeadAction: "",
      fifthStageLeadAction: "",
      lastFirstStageLeadAction: "",
      lastSecondStageLeadAction: "",
      lastThirdStageLeadAction: "",
      lastFouthStageLeadAction: "",
      lastFifthStageLeadAction: "",
      sub_stage: "",
      allleadaction: "",
      clgId: "",
      sortKey: "lead_times_at",
      sortOrder: "-1",
      format: "search",
      accessAllLeads: 1,
      state: "",
      city: "",
      course: "",
      stateName: "",
      cityName: "",
      courseName: "",
      category: category,
      noOfReEnquiry: "",
      reEnquiryOperation: "",
      noOfApplicationForm: "",
      applicationFormOperation: "",
      lead_score: "",
      leadScoreOpreation: "",
      lead_stage_count: "",
      leadStageCountOpreation: "",
      recentReEnquiredAtOperation: "",
      lastReEnquiredAtOperation: "",
      recentLeadStageAtOperation: "",
      leadActivityAtOperation: "",
      createdAtOperation: "",
      updatedAtOperation: "",
      leadAssignAtOperation: "",
      reEnquiredClg: "",
      lastReEnquiredClg: "",
      reEnquiredClgSource: "",
      reEnquiredsdate: "",
      reEnquirededate: "",
      reLastEnquiredsdate: "",
      reLastEnquirededate: "",
      utmSource: "",
      utmCampaign: "",
      utmMedium: "",
      reEnquiredUtmSource: "",
      reEnquiredUtmMedium: "",
      reEnquiredUtmCampaign: "",
      fw_sdate: "",
      fw_edate: "",
      n_id: "",
      recentLeadStageStartDate: "",
      recentLeadStageEndDate: "",
      leadAssigneeStartDate: "",
      leadAssigneeEndDate: "",
      oldUserId: "",
      reAssignedUserId: "",
      activity_event: "",
      publisher_tenant_id: "",
      org_location_name: "",
      sinceLeadOwnerChange: "",
      createdAtAgeTimeGap: "",
      ownerAssignmentAtAgeTimeGap: "",
      stageCreatedAtAgeTimeGap: " ",
      primary_source: "",
      secondary_source: "",
      tertiary_source: "",
      last_source: ""
    };

    return from(
      axios.post(this.leadsUrl, body, { headers })
    ).pipe(
      map(response => {
        if (response.status === 200 && response.data) {
          const data = response.data.data || [];
          return {
            code: response.data.code || 200,
            success: response.data.success || true,
            count: response.data.count || data.length,
            data: data,
            customFields: response.data.customFields || []
          };
        } else {
          return {
            code: response.status || 500,
            success: false,
            count: 0,
            data: [],
            customFields: []
          };
        }
      })
    );
  }
}
