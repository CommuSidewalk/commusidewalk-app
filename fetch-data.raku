mkdir('static/data');

# download csv from commusidewalk repo
sub download-csv-by-date(Date $date) {
  my $csv-url = 'https://raw.githubusercontent.com/FOBshippingpoint/commusidewalk/master/output/village.csv';
  say 'Download from: ' ~ $csv-url;
  run 'curl', $csv-url, '-o', 'static/data/data.csv';
}

my $date = Date.today;

try {
  download-csv-by-date $date;
  die "404 not found" if slurp('static/data/data.csv') ~~ / 404\:\sNot\sFound /;

  CATCH {
    default {
      # if 404 not found, then make the day 1 day earlier
      # 因為 commusidewalk 使用 cron job 定時於每日 23:00 更新，所以若在當天還沒有資料時跑會出錯，因此要退一步下載昨天的資料
      say $date ~ " csv file not found, try fetch 1 day earlier.";
      $date .= earlier(:1day);
      download-csv-by-date $date;
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
