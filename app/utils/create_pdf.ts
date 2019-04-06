import pdf from 'html-pdf'

export interface IHTMLParams {
  report_id: string
  app_name: string
  app_version: string
  app_id: string
  start_time: string
  download_time: string
  ok: boolean
  command: string
  result: string
}

/**
 * return buffer for pdf
 * @param {IHTMLParams} params
 * @export
 * @async
 * @return {Promise<Buffer>}
 */
export async function createHtml (params: IHTMLParams): Promise<Buffer> {
  let {
    app_name,
    report_id,
    app_id,
    app_version,
    ok,
    start_time,
    command,
    download_time,
    result } = params
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Report-${report_id}</title>
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <link href="https://cdn.bootcss.com/font-awesome/5.8.1/css/all.min.css" rel="stylesheet">
      <link rel="stylesheet" href="http://static.lenconda.top/css/github.css">
      <style>
        body {
          box-sizing: border-box;
          padding: 30px;
        }
      </style>
    </head>
    <body>
      <h1>Report For ${app_name}</h1>
      <article class="markdown-body">
        <h2>Basic Information</h2>
        <ul>
          <li><b>Report ID: </b>${report_id}</li>
          <li><b>Download Time: (UNIX Timestamp): </b>${download_time}</li>
          <li><b>Execute Time (UNIX Timestamp): </b>${start_time}</li>
          <li><b>Execute Time (Locale String): </b>${new Date(parseInt(start_time)).toString()}</li>
          <li><b>Application Name: </b>${app_name}</li>
          <li><b>Application ID: </b>${app_id}</li>
          <li><b>Application Version: </b>${app_version}</li>
          <li><b>Succeeded: </b>${ok}</li>
        </ul>
        <h2>Command(s)</h2>
        <code>
          ${command}
        </code>
        <h2>Result</h2>
        <pre>
          ${result}
        </pre>
      </article>  
    </body>
    </html>
  `
  return new Promise<Buffer>((resolve, reject) => {
    pdf.create(html, { format: 'A3' }).toBuffer((err, buffer) => {
      if (err) reject(err)
      else resolve(buffer)
    })
  })
}
