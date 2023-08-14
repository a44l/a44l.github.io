# bib2bib -s 'year' -r --expand -c 'author : "Blomenhofer"' -oc 'grep -iL "code"' atb-publications.bib bibML.bib
pandoc -t markdown_strict bib-template.md -o bib.md --bibliography atb-publications.bib

