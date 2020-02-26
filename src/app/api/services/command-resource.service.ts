/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DoctorSessionInfoDTO } from '../models/doctor-session-info-dto';
import { NextTaskResource } from '../models/next-task-resource';
import { BasicCheckUp } from '../models/basic-check-up';
import { Consultation } from '../models/consultation';
import { Prescription } from '../models/prescription';
import { ContactInfoDTO } from '../models/contact-info-dto';
import { DoctorSettingsDTO } from '../models/doctor-settings-dto';
import { DoctorDTO } from '../models/doctor-dto';
import { PaymentSettingsDTO } from '../models/payment-settings-dto';
import { QualificationDTO } from '../models/qualification-dto';
import { SessionInfoDTO } from '../models/session-info-dto';
import { WorkPlaceDTO } from '../models/work-place-dto';

/**
 * Command Resource
 */
@Injectable({
  providedIn: 'root',
})
class CommandResourceService extends __BaseService {
  static readonly createDetailsUsingPOSTPath = '/api/commands/Details';
  static readonly basicCheckUpTaskUsingPOSTPath = '/api/commands/basicCheckup/{processId}';
  static readonly consultPatientUsingPOSTPath = '/api/commands/consultPatient/{processId}';
  static readonly createContactInfoUsingPOSTPath = '/api/commands/contact-infos';
  static readonly updateContactInfoUsingPUTPath = '/api/commands/contact-infos';
  static readonly deleteContactInfoUsingDELETEPath = '/api/commands/contact-infos/{id}';
  static readonly createDoctorSettingUsingPOSTPath = '/api/commands/doctorSettings';
  static readonly updateDoctorSettingUsingPUTPath = '/api/commands/doctorSettings';
  static readonly createDoctorUsingPOSTPath = '/api/commands/doctors';
  static readonly updateDoctorUsingPUTPath = '/api/commands/doctors';
  static readonly initiateConsultationUsingPOSTPath = '/api/commands/intiates';
  static readonly storeHistoryUsingPOSTPath = '/api/commands/patient/storeHistory/{processId}';
  static readonly createPaymentSettingUsingPOSTPath = '/api/commands/paymentSettings';
  static readonly updatePaymentSettingUsingPUTPath = '/api/commands/paymentSettings';
  static readonly createQualificationUsingPOSTPath = '/api/commands/qualifications';
  static readonly updateQualificationUsingPUTPath = '/api/commands/qualifications';
  static readonly deleteQualificationUsingDELETEPath = '/api/commands/qualifications/{id}';
  static readonly requestPatientHistoryUsingPOSTPath = '/api/commands/requestPatientHistory/{processId}';
  static readonly patientPrescriptionUsingPOSTPath = '/api/commands/savePatientPrescription/{processId}';
  static readonly createSessionInfoByDatesUsingPOSTPath = '/api/commands/sessionInfobydate';
  static readonly testUsingPOSTPath = '/api/commands/test';
  static readonly createWorkPlaceUsingPOSTPath = '/api/commands/work-places';
  static readonly updateWorkPlaceUsingPUTPath = '/api/commands/work-places';
  static readonly deleteWorkPlaceUsingDELETEPath = '/api/commands/work-places';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param doctorSessionInfoDTO doctorSessionInfoDTO
   * @return OK
   */
  createDetailsUsingPOSTResponse(doctorSessionInfoDTO: DoctorSessionInfoDTO): __Observable<__StrictHttpResponse<DoctorSessionInfoDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = doctorSessionInfoDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/Details`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DoctorSessionInfoDTO>;
      })
    );
  }
  /**
   * @param doctorSessionInfoDTO doctorSessionInfoDTO
   * @return OK
   */
  createDetailsUsingPOST(doctorSessionInfoDTO: DoctorSessionInfoDTO): __Observable<DoctorSessionInfoDTO> {
    return this.createDetailsUsingPOSTResponse(doctorSessionInfoDTO).pipe(
      __map(_r => _r.body as DoctorSessionInfoDTO)
    );
  }

  /**
   * @param params The `CommandResourceService.BasicCheckUpTaskUsingPOSTParams` containing the following parameters:
   *
   * - `processId`: processId
   *
   * - `basicCheckUp`: basicCheckUp
   *
   * @return OK
   */
  basicCheckUpTaskUsingPOSTResponse(params: CommandResourceService.BasicCheckUpTaskUsingPOSTParams): __Observable<__StrictHttpResponse<NextTaskResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.basicCheckUp;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/basicCheckup/${params.processId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<NextTaskResource>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.BasicCheckUpTaskUsingPOSTParams` containing the following parameters:
   *
   * - `processId`: processId
   *
   * - `basicCheckUp`: basicCheckUp
   *
   * @return OK
   */
  basicCheckUpTaskUsingPOST(params: CommandResourceService.BasicCheckUpTaskUsingPOSTParams): __Observable<NextTaskResource> {
    return this.basicCheckUpTaskUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as NextTaskResource)
    );
  }

  /**
   * @param params The `CommandResourceService.ConsultPatientUsingPOSTParams` containing the following parameters:
   *
   * - `processId`: processId
   *
   * - `prescription`: prescription
   *
   * @return OK
   */
  consultPatientUsingPOSTResponse(params: CommandResourceService.ConsultPatientUsingPOSTParams): __Observable<__StrictHttpResponse<Consultation>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.prescription;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/consultPatient/${params.processId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Consultation>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.ConsultPatientUsingPOSTParams` containing the following parameters:
   *
   * - `processId`: processId
   *
   * - `prescription`: prescription
   *
   * @return OK
   */
  consultPatientUsingPOST(params: CommandResourceService.ConsultPatientUsingPOSTParams): __Observable<Consultation> {
    return this.consultPatientUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as Consultation)
    );
  }

  /**
   * @param contactInfoDTO contactInfoDTO
   * @return OK
   */
  createContactInfoUsingPOSTResponse(contactInfoDTO: ContactInfoDTO): __Observable<__StrictHttpResponse<ContactInfoDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = contactInfoDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/contact-infos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContactInfoDTO>;
      })
    );
  }
  /**
   * @param contactInfoDTO contactInfoDTO
   * @return OK
   */
  createContactInfoUsingPOST(contactInfoDTO: ContactInfoDTO): __Observable<ContactInfoDTO> {
    return this.createContactInfoUsingPOSTResponse(contactInfoDTO).pipe(
      __map(_r => _r.body as ContactInfoDTO)
    );
  }

  /**
   * @param contactInfoDTO contactInfoDTO
   * @return OK
   */
  updateContactInfoUsingPUTResponse(contactInfoDTO: ContactInfoDTO): __Observable<__StrictHttpResponse<ContactInfoDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = contactInfoDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/commands/contact-infos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContactInfoDTO>;
      })
    );
  }
  /**
   * @param contactInfoDTO contactInfoDTO
   * @return OK
   */
  updateContactInfoUsingPUT(contactInfoDTO: ContactInfoDTO): __Observable<ContactInfoDTO> {
    return this.updateContactInfoUsingPUTResponse(contactInfoDTO).pipe(
      __map(_r => _r.body as ContactInfoDTO)
    );
  }

  /**
   * @param id id
   */
  deleteContactInfoUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/commands/contact-infos/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteContactInfoUsingDELETE(id: number): __Observable<null> {
    return this.deleteContactInfoUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param doctorSettingsDTO doctorSettingsDTO
   * @return OK
   */
  createDoctorSettingUsingPOSTResponse(doctorSettingsDTO: DoctorSettingsDTO): __Observable<__StrictHttpResponse<DoctorSettingsDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = doctorSettingsDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/doctorSettings`,
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
   * @param doctorSettingsDTO doctorSettingsDTO
   * @return OK
   */
  createDoctorSettingUsingPOST(doctorSettingsDTO: DoctorSettingsDTO): __Observable<DoctorSettingsDTO> {
    return this.createDoctorSettingUsingPOSTResponse(doctorSettingsDTO).pipe(
      __map(_r => _r.body as DoctorSettingsDTO)
    );
  }

  /**
   * @param doctorSettingsDTO doctorSettingsDTO
   * @return OK
   */
  updateDoctorSettingUsingPUTResponse(doctorSettingsDTO: DoctorSettingsDTO): __Observable<__StrictHttpResponse<DoctorSettingsDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = doctorSettingsDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/commands/doctorSettings`,
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
   * @param doctorSettingsDTO doctorSettingsDTO
   * @return OK
   */
  updateDoctorSettingUsingPUT(doctorSettingsDTO: DoctorSettingsDTO): __Observable<DoctorSettingsDTO> {
    return this.updateDoctorSettingUsingPUTResponse(doctorSettingsDTO).pipe(
      __map(_r => _r.body as DoctorSettingsDTO)
    );
  }

  /**
   * @param doctorDTO doctorDTO
   * @return OK
   */
  createDoctorUsingPOSTResponse(doctorDTO: DoctorDTO): __Observable<__StrictHttpResponse<DoctorDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = doctorDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/doctors`,
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
   * @param doctorDTO doctorDTO
   * @return OK
   */
  createDoctorUsingPOST(doctorDTO: DoctorDTO): __Observable<DoctorDTO> {
    return this.createDoctorUsingPOSTResponse(doctorDTO).pipe(
      __map(_r => _r.body as DoctorDTO)
    );
  }

  /**
   * @param doctorDTO doctorDTO
   * @return OK
   */
  updateDoctorUsingPUTResponse(doctorDTO: DoctorDTO): __Observable<__StrictHttpResponse<DoctorDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = doctorDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/commands/doctors`,
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
   * @param doctorDTO doctorDTO
   * @return OK
   */
  updateDoctorUsingPUT(doctorDTO: DoctorDTO): __Observable<DoctorDTO> {
    return this.updateDoctorUsingPUTResponse(doctorDTO).pipe(
      __map(_r => _r.body as DoctorDTO)
    );
  }

  /**
   * @return OK
   */
  initiateConsultationUsingPOSTResponse(): __Observable<__StrictHttpResponse<NextTaskResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/intiates`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<NextTaskResource>;
      })
    );
  }
  /**
   * @return OK
   */
  initiateConsultationUsingPOST(): __Observable<NextTaskResource> {
    return this.initiateConsultationUsingPOSTResponse().pipe(
      __map(_r => _r.body as NextTaskResource)
    );
  }

  /**
   * @param params The `CommandResourceService.StoreHistoryUsingPOSTParams` containing the following parameters:
   *
   * - `processId`: processId
   *
   * - `otp`: otp
   *
   * - `choice`: choice
   *
   * @return OK
   */
  storeHistoryUsingPOSTResponse(params: CommandResourceService.StoreHistoryUsingPOSTParams): __Observable<__StrictHttpResponse<NextTaskResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.otp != null) __params = __params.set('otp', params.otp.toString());
    if (params.choice != null) __params = __params.set('choice', params.choice.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/patient/storeHistory/${params.processId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<NextTaskResource>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.StoreHistoryUsingPOSTParams` containing the following parameters:
   *
   * - `processId`: processId
   *
   * - `otp`: otp
   *
   * - `choice`: choice
   *
   * @return OK
   */
  storeHistoryUsingPOST(params: CommandResourceService.StoreHistoryUsingPOSTParams): __Observable<NextTaskResource> {
    return this.storeHistoryUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as NextTaskResource)
    );
  }

  /**
   * @param paymentSettingsDTO paymentSettingsDTO
   * @return OK
   */
  createPaymentSettingUsingPOSTResponse(paymentSettingsDTO: PaymentSettingsDTO): __Observable<__StrictHttpResponse<PaymentSettingsDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = paymentSettingsDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/paymentSettings`,
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
   * @param paymentSettingsDTO paymentSettingsDTO
   * @return OK
   */
  createPaymentSettingUsingPOST(paymentSettingsDTO: PaymentSettingsDTO): __Observable<PaymentSettingsDTO> {
    return this.createPaymentSettingUsingPOSTResponse(paymentSettingsDTO).pipe(
      __map(_r => _r.body as PaymentSettingsDTO)
    );
  }

  /**
   * @param paymentSettingsDTO paymentSettingsDTO
   * @return OK
   */
  updatePaymentSettingUsingPUTResponse(paymentSettingsDTO: PaymentSettingsDTO): __Observable<__StrictHttpResponse<PaymentSettingsDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = paymentSettingsDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/commands/paymentSettings`,
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
   * @param paymentSettingsDTO paymentSettingsDTO
   * @return OK
   */
  updatePaymentSettingUsingPUT(paymentSettingsDTO: PaymentSettingsDTO): __Observable<PaymentSettingsDTO> {
    return this.updatePaymentSettingUsingPUTResponse(paymentSettingsDTO).pipe(
      __map(_r => _r.body as PaymentSettingsDTO)
    );
  }

  /**
   * @param qualificationDTO qualificationDTO
   * @return OK
   */
  createQualificationUsingPOSTResponse(qualificationDTO: QualificationDTO): __Observable<__StrictHttpResponse<QualificationDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = qualificationDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/qualifications`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QualificationDTO>;
      })
    );
  }
  /**
   * @param qualificationDTO qualificationDTO
   * @return OK
   */
  createQualificationUsingPOST(qualificationDTO: QualificationDTO): __Observable<QualificationDTO> {
    return this.createQualificationUsingPOSTResponse(qualificationDTO).pipe(
      __map(_r => _r.body as QualificationDTO)
    );
  }

  /**
   * @param qualificationDTO qualificationDTO
   * @return OK
   */
  updateQualificationUsingPUTResponse(qualificationDTO: QualificationDTO): __Observable<__StrictHttpResponse<QualificationDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = qualificationDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/commands/qualifications`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QualificationDTO>;
      })
    );
  }
  /**
   * @param qualificationDTO qualificationDTO
   * @return OK
   */
  updateQualificationUsingPUT(qualificationDTO: QualificationDTO): __Observable<QualificationDTO> {
    return this.updateQualificationUsingPUTResponse(qualificationDTO).pipe(
      __map(_r => _r.body as QualificationDTO)
    );
  }

  /**
   * @param id id
   */
  deleteQualificationUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/commands/qualifications/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteQualificationUsingDELETE(id: number): __Observable<null> {
    return this.deleteQualificationUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `CommandResourceService.RequestPatientHistoryUsingPOSTParams` containing the following parameters:
   *
   * - `processId`: processId
   *
   * - `choice`: choice
   *
   * @return OK
   */
  requestPatientHistoryUsingPOSTResponse(params: CommandResourceService.RequestPatientHistoryUsingPOSTParams): __Observable<__StrictHttpResponse<NextTaskResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.choice != null) __params = __params.set('choice', params.choice.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/requestPatientHistory/${params.processId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<NextTaskResource>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.RequestPatientHistoryUsingPOSTParams` containing the following parameters:
   *
   * - `processId`: processId
   *
   * - `choice`: choice
   *
   * @return OK
   */
  requestPatientHistoryUsingPOST(params: CommandResourceService.RequestPatientHistoryUsingPOSTParams): __Observable<NextTaskResource> {
    return this.requestPatientHistoryUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as NextTaskResource)
    );
  }

  /**
   * @param params The `CommandResourceService.PatientPrescriptionUsingPOSTParams` containing the following parameters:
   *
   * - `processId`: processId
   *
   * - `prescription`: prescription
   *
   * @return OK
   */
  patientPrescriptionUsingPOSTResponse(params: CommandResourceService.PatientPrescriptionUsingPOSTParams): __Observable<__StrictHttpResponse<NextTaskResource>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.prescription;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/savePatientPrescription/${params.processId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<NextTaskResource>;
      })
    );
  }
  /**
   * @param params The `CommandResourceService.PatientPrescriptionUsingPOSTParams` containing the following parameters:
   *
   * - `processId`: processId
   *
   * - `prescription`: prescription
   *
   * @return OK
   */
  patientPrescriptionUsingPOST(params: CommandResourceService.PatientPrescriptionUsingPOSTParams): __Observable<NextTaskResource> {
    return this.patientPrescriptionUsingPOSTResponse(params).pipe(
      __map(_r => _r.body as NextTaskResource)
    );
  }

  /**
   * @param doctorSessionInfoDTO doctorSessionInfoDTO
   * @return OK
   */
  createSessionInfoByDatesUsingPOSTResponse(doctorSessionInfoDTO: Array<DoctorSessionInfoDTO>): __Observable<__StrictHttpResponse<Array<SessionInfoDTO>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = doctorSessionInfoDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/sessionInfobydate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<SessionInfoDTO>>;
      })
    );
  }
  /**
   * @param doctorSessionInfoDTO doctorSessionInfoDTO
   * @return OK
   */
  createSessionInfoByDatesUsingPOST(doctorSessionInfoDTO: Array<DoctorSessionInfoDTO>): __Observable<Array<SessionInfoDTO>> {
    return this.createSessionInfoByDatesUsingPOSTResponse(doctorSessionInfoDTO).pipe(
      __map(_r => _r.body as Array<SessionInfoDTO>)
    );
  }

  /**
   * @return OK
   */
  testUsingPOSTResponse(): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/test`,
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
  testUsingPOST(): __Observable<string> {
    return this.testUsingPOSTResponse().pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param workPlaceDTO workPlaceDTO
   * @return OK
   */
  createWorkPlaceUsingPOSTResponse(workPlaceDTO: WorkPlaceDTO): __Observable<__StrictHttpResponse<WorkPlaceDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = workPlaceDTO;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/commands/work-places`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<WorkPlaceDTO>;
      })
    );
  }
  /**
   * @param workPlaceDTO workPlaceDTO
   * @return OK
   */
  createWorkPlaceUsingPOST(workPlaceDTO: WorkPlaceDTO): __Observable<WorkPlaceDTO> {
    return this.createWorkPlaceUsingPOSTResponse(workPlaceDTO).pipe(
      __map(_r => _r.body as WorkPlaceDTO)
    );
  }

  /**
   * @param workPlaceDTO workPlaceDTO
   * @return OK
   */
  updateWorkPlaceUsingPUTResponse(workPlaceDTO: WorkPlaceDTO): __Observable<__StrictHttpResponse<WorkPlaceDTO>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = workPlaceDTO;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/commands/work-places`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<WorkPlaceDTO>;
      })
    );
  }
  /**
   * @param workPlaceDTO workPlaceDTO
   * @return OK
   */
  updateWorkPlaceUsingPUT(workPlaceDTO: WorkPlaceDTO): __Observable<WorkPlaceDTO> {
    return this.updateWorkPlaceUsingPUTResponse(workPlaceDTO).pipe(
      __map(_r => _r.body as WorkPlaceDTO)
    );
  }

  /**
   * @param id id
   */
  deleteWorkPlaceUsingDELETEResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/commands/work-places`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id id
   */
  deleteWorkPlaceUsingDELETE(id: number): __Observable<null> {
    return this.deleteWorkPlaceUsingDELETEResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CommandResourceService {

  /**
   * Parameters for basicCheckUpTaskUsingPOST
   */
  export interface BasicCheckUpTaskUsingPOSTParams {

    /**
     * processId
     */
    processId: string;

    /**
     * basicCheckUp
     */
    basicCheckUp: BasicCheckUp;
  }

  /**
   * Parameters for consultPatientUsingPOST
   */
  export interface ConsultPatientUsingPOSTParams {

    /**
     * processId
     */
    processId: string;

    /**
     * prescription
     */
    prescription: Prescription;
  }

  /**
   * Parameters for storeHistoryUsingPOST
   */
  export interface StoreHistoryUsingPOSTParams {

    /**
     * processId
     */
    processId: string;

    /**
     * otp
     */
    otp?: string;

    /**
     * choice
     */
    choice?: string;
  }

  /**
   * Parameters for requestPatientHistoryUsingPOST
   */
  export interface RequestPatientHistoryUsingPOSTParams {

    /**
     * processId
     */
    processId: string;

    /**
     * choice
     */
    choice?: string;
  }

  /**
   * Parameters for patientPrescriptionUsingPOST
   */
  export interface PatientPrescriptionUsingPOSTParams {

    /**
     * processId
     */
    processId: string;

    /**
     * prescription
     */
    prescription: Prescription;
  }
}

export { CommandResourceService }
