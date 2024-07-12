/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {InspectorControls, useBlockProps, RichText} from '@wordpress/block-editor';

import {Button, PanelHeader } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes: { ancres }, setAttributes } = props

	/**
	 * Update object keynumber on array keynumbers
	 *
	 * @param keynumber keynumber we want to update
	 * @param object the updated field
	 * @return newKeyNumber the updated keynumbers array
	 */
	const updateAttributes = (ancre, object) => {
		const newAncre = Object.assign({}, ancre, object)
		// Remove the link on array to replace with the new one
		const newAncres = [
			...ancres.filter(
				item => item.id !== ancre.id
			),
			newAncre
		]
		// Sort ASC the array on id
		return newAncres.sort(( a,b ) => {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)})
	}
	/**
	 * Add keynumber to array keynumbers
	 * @return newKeyNumbers the updated keynumbers array
	 */
	const addAncre = () => {
		const newAncres = (ancres) ? [ ...ancres ] : []
		const id = (ancres && ancres.length > 0)
			?  ancres.reduce((acc, ancre) => acc = acc > ancre.id ? acc : ancre.id, 0) + 1
			: 0

		newAncres.push( {
			id,
			idAncre: '',
			labelAncre: ''
		} )

		return newAncres
	}
	// Init the module with 1 key number
	if(ancres.length === 0){
		setAttributes({ ancres: addAncre() })
	}
	/**
	 * Remove keynumber from array keynumbers
	 * @param keyNumber keynumber we want to remove
	 * @return the updated keynumbers array
	 */
	const deleteAttributes = (ancre) =>  {
		return [
			...ancres.filter(
				item => item.id !== ancre.id
			)
		]
	}

	// Generate the render for attributes field
	const ancresList = ancres.map( ( ancre ) => {
		return (
			
				<div className={`ancre-content ancre-${ancre.id}`} >
					<div>
						<p><strong>Intitulé menu :&nbsp;</strong> </p>
						<RichText
							tagName="p"
							className="ancre-label"
							placeholder={__('Label','gutenberg_admin')}
							value={ ancre.labelAncre }
							onChange={ (labelAncre) => setAttributes({ ancres: updateAttributes( ancre, { labelAncre }) }) }
						/>
					</div>
					<div>
						<p><strong>ID de l'ancre :&nbsp;</strong></p>
						<RichText
							tagName="p"
							className="ancre-id"
							placeholder={__('Id de l\'ancre','gutenberg_admin')}
							value={ ancre.idAncre }
							onChange={ (idAncre) => setAttributes({ ancres: updateAttributes( ancre, { idAncre }) }) }
						/>
					</div>
					{(ancres.length > 1) ? (
						<Button
							isDestructive
							className="remove-ancre"
							icon="no-alt"
							onClick={ () => { setAttributes({ ancres: deleteAttributes(ancre) }) } }
						>
							{__('Supprimer', 'gutenberg_admin') }
						</Button>
					) : ''}
				</div>
			
			)
	} )

	return [
		<InspectorControls>
		  <PanelHeader>
			<Button
			  icon="plus"
			  onClick={ () => { setAttributes({ ancres: addAncre() })} }
			>
			  { __('Ajouter une ancre','gutenberg_admin') }
			</Button>
		  </PanelHeader>
		</InspectorControls>
		,
		<div { ...useBlockProps() }>
			<div className="wrapper-content">
				<div className="nav-ancres-wrap">{ ancresList }</div>
		  	</div>
		</div>
	]
}
