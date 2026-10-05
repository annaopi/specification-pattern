export interface InferenceRequest {
	developer_message: string
	user_message: string

	response_format?: {
		type: "json_schema"
		name: string
		strict: boolean
		schema: any
	}
}
