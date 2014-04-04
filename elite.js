/*
 * This script is not finished, but it will create a random name from Elites Galaxies
 * 
 * usage: just call
 * genNames()
 * 
 */

var digrams =
  "ABOUSEITILETSTONLONUTHNO" +
  "..LEXEGEZACEBISO" +
  "USESARMAINDIREA." +
  "ERATENBERALAVETI" +
  "EDORQUANTEISRION";

var seed0= 0;
var seed1= 0;
var seed2= 0;

function rotatel(x)
{
    var tmp = (x & 255) * 2;

    if(tmp > 255) tmp -= 255;

    return tmp;
}

function twist(x)
{
    return (256 * rotatel(x / 256)) + rotatel(x & 255);
}

function next()
{
    seed0 = twist(seed0);
    seed1 = twist(seed1);
    seed2 = twist(seed2);
}

function tweakseed()
{
    var tmp;

    tmp = seed0 + seed1 + seed2;
    tmp &= 65535;

    seed0 = seed1;
    seed1 = seed2;
    seed2 = tmp;
}

function makename(pairs)
{
    var name = "";
    var pair1, pair2, pair3, pair4;
    var longname;

    longname = seed0 & 64;

    pair1 = 2 * ((seed2 / 256) & 31); tweakseed();
    pair2 = 2 * ((seed2 / 256) & 31); tweakseed();
    pair3 = 2 * ((seed2 / 256) & 31); tweakseed();
    pair4 = 2 * ((seed2 / 256) & 31); tweakseed();

    name += sprintf("%c", pairs[pair1]);
    name += sprintf("%c", pairs[pair1 + 1]);
    name += sprintf("%c", pairs[pair2]);
    name += sprintf("%c", pairs[pair2 + 1]);
    name += sprintf("%c", pairs[pair3]);
    name += sprintf("%c", pairs[pair3 + 1]);

    if(longname)
    {
        name += sprintf("%c", pairs[pair4]);
        name += sprintf("%c", pairs[pair4 + 1]);
    }

    name = implode(explode(name, "."), "");

    return capitalize(name);
}

function genNames()
{
    var names = ({ });
    var pairs;
    var num = 1;

    digrams = lower_case(digrams);
    pairs = digrams[24..<1];

    seed0 = 0x5a4a;
    seed1 = 0x0248;
    seed2 = 0xb753;

    for(var i = 1; i < num; ++i) next();

    for(i = 0; i < 256; ++i)
        names += ({ makename(pairs) });

    return implode(names[0..<2], ", ") + " and " + names[<1] + "\n";
}
