module Book
  module Helpers
    # Determine if current page is a chapter (i.e. a Sitemap::resource w/sort_order)
    # By default it checks the value of current_page; can accept any resource object as well
    # @return [Boolean]
    # def page_is_chapter?
    #   return false unless current_page.data.sort_order
    #   true
    # end

    # Determine if there is a chapter before the current page
    # @return Middleman::Sitemap::Resource of the previous page
    def prev_chapter_path
      return false unless current_page.respond_to?(:prev_chapter)
      current_page.prev_chapter
    end

    # Determine if there is a chapter after the current page
    # @return Middleman::Sitemap::Resource of the next page
    def next_chapter_path
      return false unless current_page.respond_to?(:next_chapter)
      current_page.next_chapter
    end

    def author_name
      author = data.book.creators.first
      "#{author.first_name} #{author.last_name}"
    end

    # --------------------------------------------------------------------------
    # Book info methods
    # Used to build up the complex strings used in the citation partial
    def book_info_chicago
      book = data.book
      path = current_path.gsub("index.html", "")
      %(
        In <em>#{book.title.main}</em>,
        edited by #{book.creators.first.first_name} #{book.creators.first.last_name}.
        #{book.edition_number} ed.
        #{book.publisher_location}:
        #{book.publisher},
        #{book.pub_date.year}.
        <span class="force-wrap">#{permalink}/#{path}</span>.
      )
    end

    def book_info_mla
      book = data.book
      path = current_path.gsub("index.html", "")
      %(
        <em>#{book.title.main}</em>. Ed. #{author_name}.
        #{book.edition_number} ed.
        #{book.publisher_location}:
        #{book.publisher_short}, #{book.pub_date.year}.
        <span class="cite-current-date">DD Mon. YYYY</span>
        <<span class="force-wrap">#{permalink}/#{path}</span>>.
      )
    end

    # --------------------------------------------------------------------------
    # Citation author method
    # Returns correct author info for citation partial
    def citation_author
      page = current_page.data
      return default_author unless page.author
      if page.author.size > 1
        %(#{page.author[0].last_name}, #{page.author[0].first_name},
          and #{page.author[1].first_name} #{page.author[1].last_name})
      else
        "#{page.author.first.last_name}, #{page.author.first.first_name}"
      end
    end

    # --------------------------------------------------------------------------
    # Default author
    # Return default author name in citation format (last, first)
    def default_author
      book = data.book
      "#{book.creators.first.last_name}, #{book.creators.first.first_name}"
    end

    def permalink
      data.book.editions.find { |edition| edition.name == "Online" }.link
    end

  end
end
