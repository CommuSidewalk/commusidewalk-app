# copy csv file to static/data

my $file = '../commusidewalk/output'; # change to your commusidewalk project folder
mkdir('static/data');
$file = $file.IO.dir.sort(-*.modified)[0];
copy $file, 'static/data/data.csv';

my $today = Date.today.yyyy-mm-dd('/');

# if .env not exist, init it
spurt '.env', 'PUBLIC_UPDATE_DATE = ' ~ $today unless '.env'.IO.e;
my $contents = slurp '.env';
$contents ~~ s/ (PUBLIC_UPDATE_DATE\h\=\h)(\S+) /{$0}{$today}/;

spurt '.env', $contents;

say "copy $file to static/data/data.csv done :)";
say "new .env file:\n" ~ $contents;
