import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GenericResponse, GenericResponseHelper } from '../../../core/models/generic-response.model';
import { CreateWorkflowRequest, DashboardOverview, WorkflowSummary, WorkflowList, Calendar, WorkflowDetail, UpdateWorkflowRequest } from '../dashboard.model';

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

  getWorkflowList(searchQuery?: string): Observable<WorkflowList> {
    const params = searchQuery ? { search: searchQuery } : undefined;
    return this.http
      .get<GenericResponse<WorkflowList>>(this.WORKFLOWS_URL, { params })
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
          const message = error?.error?.message || error?.message || 'Workflow listesi alınamadı';
          return throwError(() => new Error(message));
        })
      );
  }

  getCalendar(year: number, month: number): Observable<Calendar> {
    const params = { year: year.toString(), month: month.toString() };
    return this.http
      .get<GenericResponse<Calendar>>(`${this.DASHBOARD_URL}/calendar`, { params })
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
          const message = error?.error?.message || error?.message || 'Takvim verileri alınamadı';
          return throwError(() => new Error(message));
        })
      );
  }

  updateWorkflowStatus(workflowId: number, status: string): Observable<WorkflowSummary> {
    const params = { status };
    return this.http
      .put<GenericResponse<WorkflowSummary>>(`${this.WORKFLOWS_URL}/${workflowId}/status`, null, { params })
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
          const message = error?.error?.message || error?.message || 'Workflow status güncellenemedi';
          return throwError(() => new Error(message));
        })
      );
  }

  getWorkflowById(workflowId: number): Observable<WorkflowDetail> {
    return this.http
      .get<GenericResponse<WorkflowDetail>>(`${this.WORKFLOWS_URL}/${workflowId}`)
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
          const message = error?.error?.message || error?.message || 'Workflow detayları alınamadı';
          return throwError(() => new Error(message));
        })
      );
  }

  updateWorkflow(request: UpdateWorkflowRequest): Observable<WorkflowSummary> {
    return this.http
      .put<GenericResponse<WorkflowSummary>>(`${this.WORKFLOWS_URL}/${request.workflowId}`, request)
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
          const message = error?.error?.message || error?.message || 'Workflow güncellenemedi';
          return throwError(() => new Error(message));
        })
      );
  }
}
