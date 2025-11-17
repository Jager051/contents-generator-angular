import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GenericResponse, GenericResponseHelper } from '../../../core/models/generic-response.model';
import { CreateWorkflowRequest, DashboardOverview, WorkflowSummary } from '../dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly DASHBOARD_URL = `${environment.apiUrl}/dashboard`;
  private readonly WORKFLOWS_URL = `${environment.apiUrl}/workflows`;

  constructor(private http: HttpClient) {}

  getOverview(): Observable<DashboardOverview> {
    return this.http
      .get<GenericResponse<DashboardOverview>>(`${this.DASHBOARD_URL}/overview`)
      .pipe(
        map((response) => {
          if (GenericResponseHelper.isSuccess(response)) {
            const data = GenericResponseHelper.getData(response);
            if (data) {
              return data;
            }
          }

          throw new Error(GenericResponseHelper.getMessage(response));
        }),
        catchError((error) => {
          const message = error?.error?.message || error?.message || 'Dashboard verileri alınamadı';
          return throwError(() => new Error(message));
        })
      );
  }

  createWorkflow(payload: CreateWorkflowRequest): Observable<WorkflowSummary> {
    return this.http.post<GenericResponse<WorkflowSummary>>(this.WORKFLOWS_URL, payload).pipe(
      map((response) => {
        if (GenericResponseHelper.isSuccess(response)) {
          const data = GenericResponseHelper.getData(response);
          if (data) {
            return data;
          }
        }

        throw new Error(GenericResponseHelper.getMessage(response));
      }),
      catchError((error) => {
        const message = error?.error?.message || error?.message || 'Workflow could not be created';
        return throwError(() => new Error(message));
      })
    );
  }
}
