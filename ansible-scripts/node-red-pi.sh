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
            --tags "flash" \
            --extra-vars "device_name=$2"
        ;;
    restart)
        ansible -i \
            production \
            noderedpi \
            --private-key ./node-red-pi/ssh-key-node-red-pi-plantbud.key \
            --become \
            -a "/sbin/reboot"
        ;;
    config_update)
        ansible-playbook -i \
            production \
            ansible-tasks/node-red-pi-extra.yml \
            --tags "config_update"
        ;;
    config_pull)
        ansible-playbook -i \
            production \
            ansible-tasks/node-red-pi-extra.yml \
            --tags "config_pull"
        ;;
    install_node)
        ansible-playbook -i \
            production \
            ansible-tasks/node-red-pi-extra.yml \
            --tags "install_node" \
            --extra-vars "npm_package=$2"
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
