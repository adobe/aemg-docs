package com.adobe.aem.dxml.aemgdocs.core.models;

import org.jetbrains.annotations.NotNull;

import com.adobe.cq.export.json.ComponentExporter;

/**
 * Defines the {@code Searchbar} Sling Model used for the {@code /apps/core/wcm/components/search/advance/searchbar} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 12.2.0
 */
public interface Searchbar extends ComponentExporter {

    /**
     * Name of the configuration policy property that defines the option to hide search button.
     * The property should provide a boolean value.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.2.0
     */
    String PN_HIDE_BUTTON = "hideButton";

    /**
     * The place holder for search box.
     *
     * @return number of results
     * @since com.adobe.cq.wcm.core.components.models 12.2.0
     */

    String PN_RESULT_PAGE = "resultpage";

    /**
     * The minimum length of the search term to start the search.
     *
     * @return minimum length of the search term
     * @since com.adobe.cq.wcm.core.components.models 12.2.0
     */
    default boolean getHideButton() {
        throw new UnsupportedOperationException();
    }

    /**
     * @see ComponentExporter#getExportedType()
     * @since com.adobe.cq.wcm.core.components.models 12.2.0
     */

    default String getResultpage() {
        throw new UnsupportedOperationException();
    }


    /**
     * @see ComponentExporter#getExportedType()
     * @since com.adobe.cq.wcm.core.components.models 12.2.0
     */
    @NotNull
    @Override
    default String getExportedType() {
        throw new UnsupportedOperationException();
    }
}

