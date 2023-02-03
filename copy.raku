my $file = '../commusidewalk/output';
mkdir('static/data');
$file = $file.IO.dir.sort(-*.modified)[0];
copy $file, 'static/data/' ~ $file.basename;
