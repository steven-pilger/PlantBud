#!/bin/bash

case $1 in
    update)
        ansible-playbook -i \
            production \
            ansible-tasks/node-red-pi-extra.yml \
            --tags "update"
        ;;
    flash)
        ansible-playbook -i \
            production \
            ansible-tasks/node-red-pi-extra.yml \
            --tags "flash"
        ;;
    setup)
        ansible-playbook -i \
            production \
            node-red-pi.yml
        ;;
    *)
        echo Case unspecified, use for example 'update' or 'setup'
        ;;
esac
