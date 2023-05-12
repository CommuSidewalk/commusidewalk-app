mkdir('static/data');

# download csv from commusidewalk-data repo
my $csv-url = 'https://raw.githubusercontent.com/CommuSidewalk/commusidewalk-data/master/output/village.csv';
say 'Download from: ' ~ $csv-url;
run 'curl', $csv-url, '-o', 'static/data/data.csv';
say "download complete";

my $date = Date.today;

# update .env update_date YYYY/mm/dd
my $update-date = $date.yyyy-mm-dd('/');
# if .env not exist, init it
spurt '.env', 'PUBLIC_UPDATE_DATE = ' ~ $update-date unless '.env'.IO.e;

my $contents = slurp '.env';
$contents ~~ s/ (PUBLIC_UPDATE_DATE\h\=\h)(\S+) /{$0}{$update-date}/;
spurt '.env', $contents;

say "new .env file:\n" ~ $contents;
