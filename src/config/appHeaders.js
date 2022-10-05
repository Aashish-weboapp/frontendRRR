export const HEADERS = {
    LOGIN: (basicData) => {
        return {
            'Accept': 'application/json,text/plain',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicData}`,
            'Cache-Control': 'no-cache'
        }
    },
    AUTHENTIC: () => {
        return {
            'Accept': 'application/json,text/plain',
            'Content-Type': 'application/json',
            //'Authorization':'Basic YWRtaW46YWRtaW4=',
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0OTQ3NjgyLCJpYXQiOjE2NjQ4NjEyODIsImp0aSI6Ijc0ZDUyOGE5ZDQ0NTQxYjJhZWJiNTI4MzU3Mjg5NDU3IiwidXNlcl9pZCI6MX0.nNm1DxTOQhHCuVmGD5-0N8CzrV6wfXce712gZZcjIVE`,
            'Cache-Control': 'no-cachey',
            'Access-Control-Allow-Origin' : '*'
        }
    }
}


