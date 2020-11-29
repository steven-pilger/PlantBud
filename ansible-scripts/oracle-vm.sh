#!/bin/bash

case $1 in
    update)
        ansible-playbook -i \
            production \
            ansible-tasks/oracle-vm-extra.yml \
            --tags "update"
        ;;
    secrets)
        ansible-playbook -i \
            production \
            ansible-tasks/oracle-vm-extra.yml \
            --tags "secrets"
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
