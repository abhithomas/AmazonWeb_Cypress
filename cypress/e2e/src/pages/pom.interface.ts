/**
 * Description: A common interface for POMs consisting of important subparts like elements, actions and navigation.
 */

export interface Pom<TElements, TActions, TNavigate = void> {
    /**
     * Defines page elements
     */
    elements: TElements;
    /**
     * Predefined actions to be performed on the page under test.
     */
    actions: TActions;
    /**
     * Function that navigates to the page.
     */
    navigate: TNavigate;
}
