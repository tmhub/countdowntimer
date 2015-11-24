<?php
/*
* Prepare list of skins for Flip Timer.
* 'value' => css class
*/
class TM_CountdownTimer_Model_Sources_Fliptimerskin
{
    public function toOptionArray()
    {
        return array(
            array(
                'value' => 'flip-light',
                'label' => 'Light',
            ),
            array(
                'value' => 'flip-dark',
                'label' => 'Dark',
            ),
        );
    }
}