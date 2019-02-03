/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">

          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('introduction/quick-start.html', this.props.language)}>
                Quick Start
            </a>
              <a href={this.docUrl('configuration/options.html', this.props.language)}>
                  Configuration
              </a>
              <a href={this.docUrl('server/controllers.html', this.props.language)}>
                  Server
              </a>
              <a href={this.docUrl('application/app.html', this.props.language)}>
                  Application
              </a>
              <a href={this.docUrl('modules/simple-modules.html', this.props.language)}>
                  Modules
              </a>
              <a href={this.docUrl('injection/dependency-injection.html', this.props.language)}>
                  Injection
              </a>
          </div>

          <div>
            <h5>More</h5>
            <a href="https://github.com/shmoop207/appolo">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>


        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
