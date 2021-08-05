export async function uploadToSlate(file) {
    const url = 'https://uploads.slate.host/api/public/626533fc-0557-4f70-8754-d2a6613ce747'; // collection ID
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
