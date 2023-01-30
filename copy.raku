# my $path = '../commusidewalk/output/';
#
# for dir($path, test => /:i '.' csv $/) -> $file {
#   say $file
# }

my $file = '../commusidewalk/output/rank.json';

mkdir('./src/lib/data');
move $file, './src/lib/data/data.json';
