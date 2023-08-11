import fs from 'fs';

export async function GET() {
  let companyList;

  try {
    const companyCSV = fs.readFileSync('data/target_company.csv').toString('utf8');
    companyList = companyCSV.replaceAll('\r', '').split('\n').slice(1).filter(e => e.length > 0).map(e => e.split(','));
  } catch (err) {
    console.error(err);
    return new Response(err, { status: 500 });
  }

  return Response.json(companyList);
}