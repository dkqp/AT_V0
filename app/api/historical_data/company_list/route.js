import fs from 'fs';

export async function GET() {
  let companyList;

  try {
    const companyCSV = fs.readFileSync('data/target_company.csv').toString('utf8');
    companyList = companyCSV.split('\r\n').slice(1, -1).map(e => e.split(','));
  } catch (err) {
    console.error(err);
    return new Response(err, { status: 500 });
  }

  return Response.json(companyList);
}