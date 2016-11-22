#!/bin/bash

# monitoring report file
RPT=./report

# monitor cpu using rate
function m_cpu {
    cpu=`vmstat 1 2 |sed -n '$p'|gawk '{print $13}'`
    echo ${cpu}
}

# monitor memory information
function m_mem {
    mem=`free | sed -n '2p' | gawk '{print "{\"total\":"$2",\"used\":"$3"}"}'`
    echo ${mem}
}

# monitor disk information
function m_disk {
    disk_free=`df | sed -n '/$/p' | sed '1d' | gawk '{print "\""$1"\","$2","$3","$4",\""$5"\",\""$6"\""}'`
    info=""
    for ln in ${disk_free}; do
       info=${info}"["${ln}"],"
    done

    info="["${info}"]"
    echo ${info}
}

# output report information
echo "{\"cpu\":`m_cpu`,\"mem\":`m_mem`,\"disk\":`m_disk`}"
