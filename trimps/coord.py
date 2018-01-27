import math

def coordCount( n, level=0 ):
    cost = 1 + .25 * .98 ** level
    if n <= 0:
        return 1
    count =  math.ceil(coordCount( n-1,level ) * cost)
    return count


def coord_level_for_trimps( trimpCount, level ):
    for i in range(200):
        trimpsRequired = coordCount( i, level )
        if trimpsRequired > trimpCount:
            return i - 1


def multiplier_for_trimps( trimpCount, level ):
    #return 1.25 ** coord_level_for_trimps( trimpCount, level )
    coordLevel = coord_level_for_trimps( trimpCount, level )
    return coordCount( coordLevel )

def info( trimpCount, level ):
    print ' ', formatNumber(trimpCount), level, formatNumber(multiplier_for_trimps( trimpCount, level ))

def formatNumber( num ):
    if num > 10 **9:
        return str(round(num / 10 ** 9, 2 )) + 'B'
    return str(round(num / 10 ** 6, 2 )) + 'M'

for trimpCount in [ 10**8, 2.5* 10**8, 10**9, 10**10,10**11 ]:
    #print str(trimpCount / 10 ** 6 ) + 'M'
    print formatNumber(trimpCount )
    for level in range(10):
        info( trimpCount, level )


print 
expectedTrimps = (1.25 * 10**9 + 3.58 * 62 * sum( [1.2 ** n for n in range(7)]) * 10**6 ) / 10**9

for level in range(10):
    info( expectedTrimps, level )


