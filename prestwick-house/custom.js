addEventListener('hawksearch:initialized', (event) => {
  const html = `
    {{#if length}}
      {{#each this}}
        {{#if visible}}
          <div class="facetValueContainer checkbox-list-facet__list__item{{attribute ' checkbox-list-facet__list__item--excluded' excluded}}{{attribute ' checkbox-list-facet__list__item--collapsible' hasChildren }}">
            {{#if selected}}
              <input id="{{@root.id}}-{{value}}" type="checkbox" checked hawksearch-facet-value value="{{value}}" />
            {{else}}
              <input id="{{@root.id}}-{{value}}" type="checkbox" hawksearch-facet-value value="{{value}}" />
            {{/if}}
            <label for="{{@root.id}}-{{value}}" class="facet__value">
              {{title}} ({{count}})
            </label>
            {{#if toggled}}
              {{> facet-checkbox-list children}}
            {{/if}}
          </div>
        {{/if}}
      {{/each}}
    {{/if}}`;
  Hawksearch.handlebars.registerPartial('custom-facet-checkbox-list', html);
});
