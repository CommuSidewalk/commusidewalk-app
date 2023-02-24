# download csv from commusidewalk repo
mkdir('static/data');
my $csv-url = 'https://raw.githubusercontent.com/FOBshippingpoint/commusidewalk/master/output/' ~ Date.today.yyyy-mm-dd('') ~ '_village.csv';
say $csv-url;
run "powershell", "curl $csv-url -o static/data/data.csv";
say "download complete";

# update .env update_date
my $today = Date.today.yyyy-mm-dd('/');
# if .env not exist, init it
spurt '.env', 'PUBLIC_UPDATE_DATE = ' ~ $today unless '.env'.IO.e;

my $contents = slurp '.env';
$contents ~~ s/ (PUBLIC_UPDATE_DATE\h\=\h)(\S+) /{$0}{$today}/;
spurt '.env', $contents;

say "new .env file:\n" ~ $contents;
