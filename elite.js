/*
 * This script creates a random name with the generator from Elite`s Galaxies
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

seed0 = 0x5a4a;
seed1 = 0x0248;
seed2 = 0xb753;
  
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

function makename()
{
    // original LPT-code was: pairs = digrams[24..<1];
    var pairs = digrams.substring(24)
    var name = "";
    var pair1, pair2, pair3, pair4;
    var longname, verylongname;

    longname = seed0 & 64;
    verylongname = seed0 & 64;

    pair1 = 2 * ((seed2 / 256) & 31); tweakseed();
    pair2 = 2 * ((seed2 / 256) & 31); tweakseed();
    pair3 = 2 * ((seed2 / 256) & 31); tweakseed();
    pair4 = 2 * ((seed2 / 256) & 31); tweakseed();
    pair5 = 2 * ((seed2 / 256) & 31); tweakseed();

    name += ( pairs[pair1]);
    name += ( pairs[pair1 + 1]);
    name += ( pairs[pair2]);
    name += ( pairs[pair2 + 1]);
    name += ( pairs[pair3]);
    name += ( pairs[pair3 + 1]);

    if(longname || verylongname)
    {
        name += ( pairs[pair4]);
        name += ( pairs[pair4 + 1]);
    }
    if(verylongname)
    {
        name += ( pairs[pair5]);
        name += ( pairs[pair5 + 1]);
    }
    return name.replace(".","");
}

