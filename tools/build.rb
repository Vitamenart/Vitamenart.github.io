# Сборка для поисковиков и AI: запускать после любых правок в js/projects.js или js/projects/*.js
#
#   ruby tools/build.rb
#
# Что делает (данные берёт из тех же JS-файлов, что и сайт — через Chrome без окна):
#   sitemap.xml   — список страниц для Google
#   robots.txt    — обход разрешён всем, включая AI-ботов
#   llms.txt      — коротко для AI: кто, чем занимается, проекты со ссылками
#   llms-full.txt — полный текст всех проектов
#   index.html, about.html — блок Schema.org Person (между <!-- schema --> и <!-- /schema -->)
#
# SITE — адрес сайта. Поменять, когда будет GitHub Pages / свой домен, и запустить сборку ещё раз.
SITE = "https://vitamenart.github.io"

require "json"
require "cgi"
require "date"
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

ROOT = File.expand_path("..", __dir__)
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
NAME = "Vitalii Menshenin"
ROLE = "Digital Product & Brand Designer"
BIO = "Design director. Sixteen years in, trained as an artist. I start with a blank page and end with a brand " \
      "that holds together everywhere: on screen, in motion, in your hand. Along the way I build the teams that keep it that way."

# ---------- данные из JS ----------
dom = IO.popen([CHROME, "--headless=new", "--disable-gpu", "--allow-file-access-from-files",
                "--dump-dom", "file://#{ROOT}/tools/build.html"], err: File::NULL, &:read)
json = dom[%r{<pre id="out">(.*?)</pre>}m, 1] or abort "Chrome не отдал данные — проверь tools/build.html"
data = JSON.parse(CGI.unescapeHTML(json))
PROJECTS, PAGES, CONTACTS = data.values_at("PROJECTS", "PAGES", "CONTACTS")
CATS = data["CATEGORIES"].reject { |c| c["id"] == "all" }

def plain(html); CGI.unescapeHTML(html.to_s.gsub(/<br\s*\/?>/, " ").gsub(/<[^>]+>/, "")).gsub(/\s+/, " ").strip; end
def attr(s); CGI.escapeHTML(s.to_s); end
def url(path); "#{SITE}/#{path}"; end
def ld(obj); %(<script type="application/ld+json">#{JSON.generate(obj).gsub("</", "<\\/")}</script>); end
def write(path, text)
  File.write(File.join(ROOT, path), text)
  puts "  #{path}"
end

PERSON = {
  "@type" => "Person", "name" => NAME, "jobTitle" => ROLE, "description" => BIO,
  "email" => "mailto:#{CONTACTS["email"]}", "image" => url("assets/about/portrait.jpg"), "url" => url(""),
  "sameAs" => CONTACTS["links"].map { |l| l["href"] }
}

# ---------- текст проекта ----------
def page_of(p); PAGES[p["id"]] || { "heading" => p["title"], "text" => [p["summary"]], "meta" => [], "blocks" => [] }; end
def cells_of(b); b["full"] ? [b["full"]] : b["compare"] ? [b["compare"]] : (b["row"] || b["triple"] || []); end
def purl(id); url("project.html?id=#{id}"); end

# ---------- Schema.org Person на главной и about ----------
puts "Schema.org Person:"
%w[index.html about.html].each do |f|
  path = File.join(ROOT, f)
  html = File.read(path).sub(%r{\n?<!-- schema -->.*?<!-- /schema -->}m, "")
  block = "<!-- schema -->\n" + ld({ "@context" => "https://schema.org" }.merge(PERSON)) + "\n<!-- /schema -->"
  write f, html.sub("</head>", "#{block}\n</head>")
end

# ---------- sitemap.xml, robots.txt ----------
puts "Для поисковиков:"
today = Date.today.to_s
pages = ["", "work.html", "about.html"] + PROJECTS.map { |p| "project.html?id=#{p["id"]}" }
write "sitemap.xml", <<~XML
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  #{pages.map { |u| "  <url><loc>#{attr url(u)}</loc><lastmod>#{today}</lastmod></url>" }.join("\n")}
  </urlset>
XML
write "robots.txt", <<~TXT
  # Обход разрешён всем, включая AI-ботов (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…)
  User-agent: *
  Allow: /
  Disallow: /tools/

  Sitemap: #{url "sitemap.xml"}
TXT

# ---------- llms.txt, llms-full.txt ----------
contacts = "- Email: #{CONTACTS["email"]}\n" + CONTACTS["links"].map { |l| "- #{l["label"]}: #{l["href"]}" }.join("\n")
by_cat = CATS.map do |c|
  "## #{c["label"]}\n\n#{c["text"]}\n\n" +
    PROJECTS.select { |p| p["category"] == c["id"] }.map { |p| "- [#{plain p["title"]}](#{purl(p["id"])}): #{plain p["summary"]}" }.join("\n")
end
write "llms.txt", <<~MD
  # #{NAME}

  > #{ROLE}. #{BIO}

  Portfolio of #{NAME}: brand identity, digital products, campaigns and design tooling, mostly for 1inch (DeFi).
  Full text of every project: #{url "llms-full.txt"}
  Showreel: #{CONTACTS["showreel"]}

  ## Contact

  #{contacts}

  #{by_cat.join("\n\n")}
MD

full = PROJECTS.map do |p|
  page = page_of(p)
  t = ["## #{plain p["title"]}", purl(p["id"]), "", plain(p["summary"]), ""]
  Array(page["text"]).each { |x| t << plain(x) << "" }
  page["meta"].to_a.each { |m| t << "#{plain m["label"]}: #{m["value"].map { |v| plain v }.join(", ")}" }
  t << ""
  page["blocks"].to_a.each do |b|
    if b["statement"] then t << (b["title"] ? "#{plain b["title"]}: " : "") + plain(b["statement"]) << ""
    elsif b["metrics"] then t << b["metrics"].map { |m| "#{plain m["value"]} #{plain m["label"]}" }.join("; ") << ""
    else
      cells_of(b).each { |c| t << ((c["title"] ? "#{plain c["title"]}: " : "") + Array(c["text"]).map { |x| plain x }.join(" ")) << "" if c.is_a?(Hash) && (c["title"] || c["text"]) }
    end
  end
  t.join("\n").gsub(/\n{3,}/, "\n\n").strip
end
write "llms-full.txt", "# #{NAME} — #{ROLE}\n\n#{BIO}\n\n## Contact\n\n#{contacts}\n\n#{full.join("\n\n")}\n"

puts "Готово.#{SITE.include?("USERNAME") ? "  ⚠ SITE ещё не задан (tools/build.rb, строка 15) — адреса в sitemap/llms временные." : ""}"
