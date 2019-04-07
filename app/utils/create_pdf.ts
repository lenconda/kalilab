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
      <style>
        body {
          font-family: monospace;
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
          <li><h3>Report ID: </h3><pre>${report_id}</pre></li>
          <li><h3>Download Time (UNIX Timestamp): </h3><pre>${download_time}</pre></li>
          <li><h3>Download Time (Locale String): </h3><pre>${new Date(parseInt(download_time)).toString()}</pre></li>
          <li><h3>Execute Time (UNIX Timestamp): </h3><pre>${start_time}</pre></li>
          <li><h3>Execute Time (Locale String): </h3><pre>${new Date(parseInt(start_time)).toString()}</pre></li>
          <li><h3>Application Name: </h3><pre>${app_name}</pre></li>
          <li><h3>Application ID: </h3><pre>${app_id}</pre></li>
          <li><h3>Application Version: </h3><pre>${app_version}</pre></li>
          <li><h3>Succeeded: </h3><pre>${ok}</pre></li>
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
