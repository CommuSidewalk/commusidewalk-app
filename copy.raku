# copy csv file to static/data

my $file = '../commusidewalk/output'; # change to your commusidewalk project folder
mkdir('static/data');
$file = $file.IO.dir.sort(-*.modified)[0];
copy $file, 'static/data/data.csv';

say "copy $file to static/data/data.csv done :)";
