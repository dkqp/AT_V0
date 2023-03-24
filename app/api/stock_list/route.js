import fs from 'fs';

export async function GET() {
  try {
    const companyCSV = fs.readFileSync('data/target_company.csv').toString('utf8');
    const companyList = companyCSV.split('\r\n').slice(1, -1).map(e => e.split(','));

    return Response.json({ companyList });
  } catch (err) {
    console.error(err);
    return new Response(err, { status: 500 });
  }
}