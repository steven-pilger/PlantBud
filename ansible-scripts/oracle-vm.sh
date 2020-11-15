#!/bin/bash

case $1 in
    restart)
        ansible-playbook -i \
            production \
            ansible-tasks/oracle-vm-extra.yml \
            --tags "restart"
        ;;
    setup)
        ansible-playbook -i \
            production \
            oracle-vm.yml
        ;;
    *)
        echo Case unspecified, use for example 'restart' or 'setup'
        ;;
esac
