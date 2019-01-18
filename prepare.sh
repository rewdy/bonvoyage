read -p "Running this script will remove all git references to BonVoyage and will make this a 'clean' project. Proceed? (y|n) " answer
case ${answer:0:1} in
    y|Y )
        echo '\n👏 Okay. Running commands...\n'
        echo -e '\nInstalling node modules...\n-------'
        npm install
        echo -e '\nRemoving git references...\n-------'
        rm -rf .git
        echo -e '\nFinal cleanup: removing last files...\n-------'
        rm readme.md
        rm prepare.sh
        echo -e '\nDone. 🎉\n\nBefore running browser sync, be sure to update the proxy settings.\n'
    ;;
    * )
        echo 'Alright. Not doing anything...'
    ;;
esac