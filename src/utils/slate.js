export async function uploadToSlate(file) {
    const url = 'https://uploads.slate.host/api/public/0e3b9b38-1c95-4fe9-ab18-3a025b0ec8a0'; // collection ID
    let data = new FormData();
    data.append("data", file);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Basic SLA99335abb-4736-4871-b037-0241236029a7TE', // API key
            },
            body: data
        });
        console.log(response);
        let result = await response.json();  
        
        return result;
    } catch(e) {
        console.log(e);
    }
}
