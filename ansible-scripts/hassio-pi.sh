#!/bin/bash

case $1 in
    update)
        ansible-playbook -i \
            production \
            ansible-tasks/hassio-pi-extra.yml \
            --tags "update"
        ;;
    config_update)
        ansible-playbook -i \
            production \
            ansible-tasks/hassio-pi-extra.yml \
            --tags "config_update"
        ;;
    setup)
        ansible-playbook -i \
            production \
            hassio-pi.yml
        ;;
    *)
        echo Case unspecified, use for example 'update' or 'setup'
        ;;
esac
