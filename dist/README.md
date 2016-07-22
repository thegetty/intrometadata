In its current state, the automatically output epub needs a little work to make it pass epubcheck-3.0.1 validation, to clean up the styling, and to add a title page. Once complete, the mobi file can also be generated.

## EPUB

1. Build: `bundle exec middleman build -e epub`
2. To avoid validation issue, find and replace across all content files: `fn:` --> `fn-`, and `fnref:` --> `fnref-`
3. Replace contents of `epup.css` with `epub-replace.css`
4. Replace contents of `index.xhtml` with `index-replace.xhtml`
5. Switch ordering of Contents and Title Page in `content.pdf`, `toc.ncx`, and `toc.xhtml`
6. Delete Citation Information, and Other Formats from `about.xhtml`
7. Epub it (zip and rename)

## MOBI

1. After EPUB steps above are complete, using command line: `kindlegen dist/epub/OEBPS/content.opf`
2. Retrieve output file, `content.mobi`, from `dist/epub/OEBPS`
