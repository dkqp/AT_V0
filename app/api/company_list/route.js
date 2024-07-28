import fs from 'fs';

export async function GET() {
  let companyList;

  try {
    const companyCSV = fs.readFileSync('../data/target_company.csv').toString('utf8');
    companyList = companyCSV.replaceAll('\r', '').split('\n').slice(1).filter(e => e.length > 0).map(e => e.split(','));

    return Response.json(companyList);
  } catch (err) {
    console.error(err);
    return new Response(err, { status: 500 });
  }
}

export async function PUT(req) {
  const {index, symbol, value} = await req.json();

  let companyList;

  try {
    const companyCSV = fs.readFileSync('../data/target_company.csv').toString('utf8');

    companyList = companyCSV
      .replaceAll('\r', '')
      .split('\n')
      .filter(e => e.length > 0)
      .map(e => e.split(','));

    companyList[Number(index) + 1][2] = value? '1' : '0';

    fs.writeFileSync(
      '../data/target_company.csv',
      companyList
        .map(e => e.join(','))
        .join('\n')
    )

    console.log(`Company List Changed : ${symbol} ${value? 'on' : 'off'}!`);

    return Response.json(companyList.slice(1));
  } catch (err) {
    console.error(err);
    return new Response(err, { status: 500 });
  }
}
