mkdir('static/data');

# download csv from commusidewalk repo
sub download-csv(Date $date) {
  my $csv-url = 'https://raw.githubusercontent.com/FOBshippingpoint/commusidewalk/master/output/' ~ $date.yyyy-mm-dd('') ~ '_village.csv';
  say 'Download from: ' ~ $csv-url;
  run "powershell", "curl $csv-url -o static/data/data.csv";
}

my $date = Date.today;

try {
  download-csv $date;

  CATCH {
    default {
      # if 404 not found, then make the day 1 day earlier
      say $date ~ " csv file not found, try fetch 1 day earlier.";
      $date .= earlier(:1day);
      download-csv $date;
    }
  }
}
say "download complete";

# update .env update_date YYYY/mm/dd
my $update-date = $date.yyyy-mm-dd('/');
# if .env not exist, init it
spurt '.env', 'PUBLIC_UPDATE_DATE = ' ~ $update-date unless '.env'.IO.e;

my $contents = slurp '.env';
$contents ~~ s/ (PUBLIC_UPDATE_DATE\h\=\h)(\S+) /{$0}{$update-date}/;
spurt '.env', $contents;

say "new .env file:\n" ~ $contents;
