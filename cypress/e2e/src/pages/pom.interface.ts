/**
 * Author: abhishek.thomas@globallogic.com
 * Date: 16/01/2024
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
     * Function that navigates to the page. (Optional)
     */
    navigate: TNavigate;
}
