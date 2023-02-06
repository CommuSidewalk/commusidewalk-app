# copy csv file to static/data

my $file = '../commusidewalk/output'; # change to your commusidewalk project folder
mkdir('static/data');
$file = $file.IO.dir.sort(-*.modified)[0];
copy $file, 'static/data/data.csv';

spurt '.env', 'PUBLIC_UPDATE_DATE = ' ~ Date.today.yyyy-mm-dd('') unless '.env'.IO.e;
my $contents = slurp '.env';
$contents .= subst(/PUBLIC_UPDATE_DATE.*$/, 'PUBLIC_UPDATE_DATE = ' ~ Date.today.yyyy-mm-dd(''));

spurt '.env', $contents;

say "copy $file to static/data/data.csv done :)";
