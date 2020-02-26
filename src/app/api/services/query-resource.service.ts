/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Slot } from '../models/slot';
import { DoctorDTO } from '../models/doctor-dto';
import { DoctorSettingsDTO } from '../models/doctor-settings-dto';
import { PageOfSessionInfo } from '../models/page-of-session-info';
import { PageOfUserRatingReview } from '../models/page-of-user-rating-review';
import { PaymentSettingsDTO } from '../models/payment-settings-dto';
import { Qualification } from '../models/qualification';
import { PageOfWorkPlace } from '../models/page-of-work-place';

/**
 * Query Resource
 */
@Injectable({
  providedIn: 'root',
})
class QueryResourceService extends __BaseService {
  static readonly createSlotUsingGETPath = '/api/query/Dr-slots/{workPlaceId}/{date}/{doctorIdpCode}';
  static readonly findDoctorByDoctorIdpCodeUsingGETPath = '/api/query/doctor/{doctorIdpCode}';
  static readonly findDoctorSettingsUsingGETPath = '/api/query/doctorSettings/{doctorIdpCode}';
  static readonly findAllSesionInfoByDoctorsWorkPlaceUsingGETPath = '/api/query/findAllSesionInfoByDoctorsWorkPlace/{doctorIdpCode}/{workPlaceId}';
  static readonly findAllUserRatingReviewUsingGETPath = '/api/query/findAllUserRatingReview';
  static readonly findPaymentSettingsByDoctorIdpCodeUsingGETPath = '/api/query/findPaymentSettingsByDoctorIdpCode/{doctorIdpCode}';
  static readonly findAllQualificationByDoctorIdpCodeUsingGETPath = '/api/query/qualifications/{doctorIdpCode}';
  static readonly testUsingGETPath = '/api/query/test';
  static readonly findWorkPlacesByDoctorIdpCodeUsingGETPath = '/api/query/workPlaces/{doctorIdpCode}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `QueryResourceService.CreateSlotUsingGETParams` containing the following parameters:
   *
   * - `workPlaceId`: workPlaceId
   *
   * - `doctorIdpCode`: doctorIdpCode
   *
   * - `date`: date
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  createSlotUsingGETResponse(params: QueryResourceService.CreateSlotUsingGETParams): __Observable<__StrictHttpResponse<Array<Slot>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/Dr-slots/${params.workPlaceId}/${params.date}/${params.doctorIdpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Slot>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.CreateSlotUsingGETParams` containing the following parameters:
   *
   * - `workPlaceId`: workPlaceId
   *
   * - `doctorIdpCode`: doctorIdpCode
   *
   * - `date`: date
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  createSlotUsingGET(params: QueryResourceService.CreateSlotUsingGETParams): __Observable<Array<Slot>> {
    return this.createSlotUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<Slot>)
    );
  }

  /**
   * @param doctorIdpCode doctorIdpCode
   * @return OK
   */
  findDoctorByDoctorIdpCodeUsingGETResponse(doctorIdpCode: string): __Observable<__StrictHttpResponse<DoctorDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/doctor/${doctorIdpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DoctorDTO>;
      })
    );
  }
  /**
   * @param doctorIdpCode doctorIdpCode
   * @return OK
   */
  findDoctorByDoctorIdpCodeUsingGET(doctorIdpCode: string): __Observable<DoctorDTO> {
    return this.findDoctorByDoctorIdpCodeUsingGETResponse(doctorIdpCode).pipe(
      __map(_r => _r.body as DoctorDTO)
    );
  }

  /**
   * @param doctorIdpCode doctorIdpCode
   * @return OK
   */
  findDoctorSettingsUsingGETResponse(doctorIdpCode: string): __Observable<__StrictHttpResponse<DoctorSettingsDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/doctorSettings/${doctorIdpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DoctorSettingsDTO>;
      })
    );
  }
  /**
   * @param doctorIdpCode doctorIdpCode
   * @return OK
   */
  findDoctorSettingsUsingGET(doctorIdpCode: string): __Observable<DoctorSettingsDTO> {
    return this.findDoctorSettingsUsingGETResponse(doctorIdpCode).pipe(
      __map(_r => _r.body as DoctorSettingsDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllSesionInfoByDoctorsWorkPlaceUsingGETParams` containing the following parameters:
   *
   * - `workPlaceId`: workPlaceId
   *
   * - `doctorIdpCode`: doctorIdpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllSesionInfoByDoctorsWorkPlaceUsingGETResponse(params: QueryResourceService.FindAllSesionInfoByDoctorsWorkPlaceUsingGETParams): __Observable<__StrictHttpResponse<PageOfSessionInfo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllSesionInfoByDoctorsWorkPlace/${params.doctorIdpCode}/${params.workPlaceId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfSessionInfo>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllSesionInfoByDoctorsWorkPlaceUsingGETParams` containing the following parameters:
   *
   * - `workPlaceId`: workPlaceId
   *
   * - `doctorIdpCode`: doctorIdpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllSesionInfoByDoctorsWorkPlaceUsingGET(params: QueryResourceService.FindAllSesionInfoByDoctorsWorkPlaceUsingGETParams): __Observable<PageOfSessionInfo> {
    return this.findAllSesionInfoByDoctorsWorkPlaceUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfSessionInfo)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllUserRatingReviewUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllUserRatingReviewUsingGETResponse(params: QueryResourceService.FindAllUserRatingReviewUsingGETParams): __Observable<__StrictHttpResponse<PageOfUserRatingReview>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findAllUserRatingReview`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfUserRatingReview>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllUserRatingReviewUsingGETParams` containing the following parameters:
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllUserRatingReviewUsingGET(params: QueryResourceService.FindAllUserRatingReviewUsingGETParams): __Observable<PageOfUserRatingReview> {
    return this.findAllUserRatingReviewUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfUserRatingReview)
    );
  }

  /**
   * @param doctorIdpCode doctorIdpCode
   * @return OK
   */
  findPaymentSettingsByDoctorIdpCodeUsingGETResponse(doctorIdpCode: string): __Observable<__StrictHttpResponse<PaymentSettingsDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/findPaymentSettingsByDoctorIdpCode/${doctorIdpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PaymentSettingsDTO>;
      })
    );
  }
  /**
   * @param doctorIdpCode doctorIdpCode
   * @return OK
   */
  findPaymentSettingsByDoctorIdpCodeUsingGET(doctorIdpCode: string): __Observable<PaymentSettingsDTO> {
    return this.findPaymentSettingsByDoctorIdpCodeUsingGETResponse(doctorIdpCode).pipe(
      __map(_r => _r.body as PaymentSettingsDTO)
    );
  }

  /**
   * @param params The `QueryResourceService.FindAllQualificationByDoctorIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `doctorIdpCode`: doctorIdpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllQualificationByDoctorIdpCodeUsingGETResponse(params: QueryResourceService.FindAllQualificationByDoctorIdpCodeUsingGETParams): __Observable<__StrictHttpResponse<Array<Qualification>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/qualifications/${params.doctorIdpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Qualification>>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindAllQualificationByDoctorIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `doctorIdpCode`: doctorIdpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findAllQualificationByDoctorIdpCodeUsingGET(params: QueryResourceService.FindAllQualificationByDoctorIdpCodeUsingGETParams): __Observable<Array<Qualification>> {
    return this.findAllQualificationByDoctorIdpCodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as Array<Qualification>)
    );
  }

  /**
   * @return OK
   */
  testUsingGETResponse(): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/test`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @return OK
   */
  testUsingGET(): __Observable<string> {
    return this.testUsingGETResponse().pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param params The `QueryResourceService.FindWorkPlacesByDoctorIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `doctorIdpCode`: doctorIdpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findWorkPlacesByDoctorIdpCodeUsingGETResponse(params: QueryResourceService.FindWorkPlacesByDoctorIdpCodeUsingGETParams): __Observable<__StrictHttpResponse<PageOfWorkPlace>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    (params.sort || []).forEach(val => {if (val != null) __params = __params.append('sort', val.toString())});
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/query/workPlaces/${params.doctorIdpCode}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PageOfWorkPlace>;
      })
    );
  }
  /**
   * @param params The `QueryResourceService.FindWorkPlacesByDoctorIdpCodeUsingGETParams` containing the following parameters:
   *
   * - `doctorIdpCode`: doctorIdpCode
   *
   * - `sort`: Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
   *
   * - `size`: Size of a page
   *
   * - `page`: Page number of the requested page
   *
   * @return OK
   */
  findWorkPlacesByDoctorIdpCodeUsingGET(params: QueryResourceService.FindWorkPlacesByDoctorIdpCodeUsingGETParams): __Observable<PageOfWorkPlace> {
    return this.findWorkPlacesByDoctorIdpCodeUsingGETResponse(params).pipe(
      __map(_r => _r.body as PageOfWorkPlace)
    );
  }
}

module QueryResourceService {

  /**
   * Parameters for createSlotUsingGET
   */
  export interface CreateSlotUsingGETParams {

    /**
     * workPlaceId
     */
    workPlaceId: number;

    /**
     * doctorIdpCode
     */
    doctorIdpCode: string;

    /**
     * date
     */
    date: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllSesionInfoByDoctorsWorkPlaceUsingGET
   */
  export interface FindAllSesionInfoByDoctorsWorkPlaceUsingGETParams {

    /**
     * workPlaceId
     */
    workPlaceId: number;

    /**
     * doctorIdpCode
     */
    doctorIdpCode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllUserRatingReviewUsingGET
   */
  export interface FindAllUserRatingReviewUsingGETParams {

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findAllQualificationByDoctorIdpCodeUsingGET
   */
  export interface FindAllQualificationByDoctorIdpCodeUsingGETParams {

    /**
     * doctorIdpCode
     */
    doctorIdpCode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }

  /**
   * Parameters for findWorkPlacesByDoctorIdpCodeUsingGET
   */
  export interface FindWorkPlacesByDoctorIdpCodeUsingGETParams {

    /**
     * doctorIdpCode
     */
    doctorIdpCode: string;

    /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
    sort?: Array<string>;

    /**
     * Size of a page
     */
    size?: number;

    /**
     * Page number of the requested page
     */
    page?: number;
  }
}

export { QueryResourceService }
