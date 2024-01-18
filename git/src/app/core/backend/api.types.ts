import { HttpResponse, HttpErrorResponse, HttpRequest, HttpHeaders } from "@angular/common/http";

export interface IApiUrlParam{
	name : string;
	value? : string;
}

export interface IApiQueryParam{
	name         : string;
	value?       : string | boolean | null | undefined;
	mandatory?   : boolean;
}

export interface IAmazeApi{
	METHOD         : string;
	URL            : string;
	URL_PARAMS?    : IApiUrlParam[];
	QUERY_PARAMS?  : IApiQueryParam[];
	PAYLOAD?       : HttpResponse<any> | null | undefined | string;
	RESPONSE?      : HttpErrorResponse | null | undefined | string;
	HEADERS?       : HttpHeaders;
}

export enum API_METHOD {
	GET        = "GET",
	POST       = "POST",
	DELETE     = "DELETE",
	PUT        = "PUT",
	PATCH      = "PATCH",
	OPTIONS    = "OPTIONS"
}

export type API_STATUS =
	| `100 Continue`
	| `101 Switching Protocols`
	| `102 Processing`
	| `103 Early Hints`
	| `200 OK`
	| `201 Created`
	| `202 Accepted`
	| `203 Non-Authoritative Information`
	| `204 No Content`
	| `205 Reset Content`
	| `206 Partial Content`
	| `300 Multiple Choices`
	| `301 Moved Permanently`
	| `302 Found`
	| `303 See Other`
	| `304 Not Modified`
	| `305 Use Proxy`
	| `306 Unused`
	| `307 Temporary Redirect`
	| `308 Permanent Redirect`
	| `400 Bad Request`
	| `401 Unauthorized`
	| `402 Payment Required`
	| `403 Forbidden`
	| `404 Not Found`
	| `405 Method Not Allowed`
	| `406 Not Acceptable`
	| `407 Proxy Authentication Required`
	| `408 Request Timeout`
	| `409 Conflict`
	| `410 Gone`
	| `411 Length Required`
	| `412 Precondition Failed`
	| `413 Request Entity Too Large`
	| `414 Request-URI Too Long`
	| `415 Unsupported Media Type`
	| `416 Requested Range Not Satisfiable`
	| `417 Expectation Failed`
	| `418 I'm a teapot`
	| `421 Misdirected Request`
	| `422 Unprocessable Entity`
	| `423 Locked`
	| `425 Too Early`
	| `426 Upgrade Required`
	| `428 Precondition Required`
	| `429 Too Many Requests`
	| `431 Request Header Fields Too Large`
	| `451 Unavailable For Legal Reasons`
	| `500 Internal Server Error`
	| `501 Not Implemented`
	| `502 Bad Gateway`
	| `503 Service Unavailable`
	| `504 Gateway Timeout`
	| `505 HTTP Version Not Supported`
	| `506 Variant Also Negotiates`
	| `507 Insufficient Storage`
	| `511 Network Authentication Required`
	| `520 Web server is returning an unknown error`
	| `522 Connection timed out`
	| `524 A timeout occurred`


